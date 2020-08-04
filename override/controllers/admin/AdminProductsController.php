<?php 

class AdminProductsController extends AdminProductsControllerCore
{

    /**
     * Ajax process upload images.
     *
     * @param int|null $idProduct
     * @param string $inputFileName
     * @param bool $die If method must die or return values
     *
     * @return array
     */
    public function ajaxProcessaddProductImage($idProduct = null, $inputFileName = 'file', $die = true)
    {
        $idProduct = $idProduct ? $idProduct : Tools::getValue('id_product');


        self::$currentIndex = 'index.php?tab=AdminProducts';
        $product = new Product((int) $idProduct);
        $legends = Tools::getValue('legend');

        if (!is_array($legends)) {
            $legends = (array) $legends;
        }

        if (!Validate::isLoadedObject($product)) {
            $files = array();
            $files[0]['error'] = $this->trans('Cannot add image because product creation failed.', array(), 'Admin.Catalog.Notification');
        }

        $image_uploader = new HelperImageUploader($inputFileName);
        $image_uploader->setAcceptTypes(array('jpeg', 'gif', 'png', 'jpg'))->setMaxSize($this->max_image_size);
        $files = $image_uploader->process();

        foreach ($files as &$file) {
            $image = new Image();
            $image->id_product = (int) ($product->id);
            $image->position = Image::getHighestPosition($product->id) + 1;

			//Set the legend label when file contains techntabel to create technical image reference 
            if(strrpos($file['name'], 'techntabel') != false){
                $image->legend = $file['name'];
            }

            foreach ($legends as $key => $legend) {
                if (!empty($legend)) {
                    $image->legend[(int) $key] = $legend;
                }
            }

            if (!Image::getCover($image->id_product)) {
                $image->cover = 1;
            } else {
                $image->cover = 0;
            }

            if (($validate = $image->validateFieldsLang(false, true)) !== true) {
                $file['error'] = $validate;
            }

            if (isset($file['error']) && (!is_numeric($file['error']) || $file['error'] != 0)) {
                continue;
            }

            if (!$image->add()) {
                $file['error'] = $this->trans('Error while creating additional image', array(), 'Admin.Catalog.Notification');
            } else {
                if (!$new_path = $image->getPathForCreation()) {
                    $file['error'] = $this->trans('An error occurred while attempting to create a new folder.', array(), 'Admin.Notifications.Error');

                    continue;
                }

                $error = 0;

                if (!ImageManager::resize($file['save_path'], $new_path . '.' . $image->image_format, null, null, 'jpg', false, $error)) {
                    switch ($error) {
                        case ImageManager::ERROR_FILE_NOT_EXIST:
                            $file['error'] = $this->trans('An error occurred while copying image, the file does not exist anymore.', array(), 'Admin.Catalog.Notification');

                            break;

                        case ImageManager::ERROR_FILE_WIDTH:
                            $file['error'] = $this->trans('An error occurred while copying image, the file width is 0px.', array(), 'Admin.Catalog.Notification');

                            break;

                        case ImageManager::ERROR_MEMORY_LIMIT:
                            $file['error'] = $this->trans('An error occurred while copying image, check your memory limit.', array(), 'Admin.Catalog.Notification');

                            break;

                        default:
                            $file['error'] = $this->trans('An error occurred while copying the image.', array(), 'Admin.Catalog.Notification');

                            break;
                    }

                    continue;
                } else {
                    $imagesTypes = ImageType::getImagesTypes('products');
                    $generate_hight_dpi_images = (bool) Configuration::get('PS_HIGHT_DPI');

                    foreach ($imagesTypes as $imageType) {
                        if (!ImageManager::resize($file['save_path'], $new_path . '-' . stripslashes($imageType['name']) . '.' . $image->image_format, $imageType['width'], $imageType['height'], $image->image_format)) {
                            $file['error'] = $this->trans('An error occurred while copying this image:', array(), 'Admin.Notifications.Error') . ' ' . stripslashes($imageType['name']);

                            continue;
                        }

                        if ($generate_hight_dpi_images) {
                            if (!ImageManager::resize($file['save_path'], $new_path . '-' . stripslashes($imageType['name']) . '2x.' . $image->image_format, (int) $imageType['width'] * 2, (int) $imageType['height'] * 2, $image->image_format)) {
                                $file['error'] = $this->trans('An error occurred while copying this image:', array(), 'Admin.Notifications.Error') . ' ' . stripslashes($imageType['name']);

                                continue;
                            }
                        }
                    }
                }

                unlink($file['save_path']);
                //Necesary to prevent hacking
                unset($file['save_path']);
                Hook::exec('actionWatermark', array('id_image' => $image->id, 'id_product' => $product->id));

                if (!$image->update()) {
                    $file['error'] = $this->trans('Error while updating the status.', array(), 'Admin.Notifications.Error');

                    continue;
                }

                // Associate image to shop from context
                $shops = Shop::getContextListShopID();
                $image->associateTo($shops);
                $json_shops = array();

                foreach ($shops as $id_shop) {
                    $json_shops[$id_shop] = true;
                }

                $file['status'] = 'ok';
                $file['id'] = $image->id;
                $file['position'] = $image->position;
                $file['cover'] = $image->cover;
                $file['legend'] = $image->legend;
                $file['path'] = $image->getExistingImgPath();
                $file['shops'] = $json_shops;

                @unlink(_PS_TMP_IMG_DIR_ . 'product_' . (int) $product->id . '.jpg');
                @unlink(_PS_TMP_IMG_DIR_ . 'product_mini_' . (int) $product->id . '_' . $this->context->shop->id . '.jpg');
            }
        }

        if ($die) {
            die(json_encode(array($image_uploader->getName() => $files)));
        } else {
            return $files;
        }
    }

}


?>

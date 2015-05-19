<?php
/*
* 2007-2015 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Open Software License (OSL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/osl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2015 PrestaShop SA
*  @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

class Core_Business_Email_EmailLister
{
	private $filesystem;

	public function __construct(Core_Foundation_FileSystem_FileSystem $fs)
	{
		// Register dependencies
		$this->filesystem = $fs;
	}

	/**
	 * Return the list of available mails
	 * @param null $lang
	 * @param null $dir
	 * @return array|null
	 */
	public function getAvailableMails($dir)
	{
		if (!file_exists($dir))
			return null;

		$mail_directory = $this->filesystem->listEntriesRecursively($dir);
		$clean_mail_list = array();

		// Remove duplicate .html / .txt / .tpl
		foreach ($mail_directory as $mail) {
			$clean_mail_list[] = $mail->getFilename();
		}

		return $clean_mail_list;
	}


	/**
	 * Give in input getAvailableMails(), will output a human readable and proper string name
	 * @return array
	 */
	public function getCleanedMailName($mail_name)
	{
		if ()
		return ucfirst(str_replace(array('_', '-'), ' ', $mail_name));
	}
}
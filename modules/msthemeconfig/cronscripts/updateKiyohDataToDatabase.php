<?php
declare(strict_types=1);

/**
 * @author JKetelaar
 */

use JKetelaar\Kiyoh\Kiyoh;

require_once dirname(__DIR__) . '/../../config/config.inc.php';
require_once('../vendor/autoload.php');

error_reporting(E_ALL);
ini_set('display_errors', 'on');

/**
 *
 */
class UpdateKiyohDataToDatabase
{
    private bool $debug;
    private array $errorMessage;
    private bool $success;
    private int $totalReviewsToFetch;
    private string $kiyohHashKey;

    /**
     * @param bool $debug
     * @param int $totalReviewsToFetch
     */
    public function __construct(bool $debug = false, int $totalReviewsToFetch = 50)
    {
        $this->debug = $debug;
        $this->errorMessage = [];
        $this->success = false;
        $this->totalReviewsToFetch = $totalReviewsToFetch;
        $this->kiyohHashKey = 'e1fk9hurmsnjxrv';

        global $kernel;
        if (!$kernel) {
            require_once _PS_ROOT_DIR_ . '/app/AppKernel.php';
            $kernel = new AppKernel('prod', false);
            $kernel->boot();
        }
    }


    /**
     * Start client and fetch data
     *
     * @return void
     */
    public function fetchDataFromKiyohServer(): void
    {
        $connector = $this->kiyohHashKey;
        $count = $this->totalReviewsToFetch;
        try {
            $kiyoh = new Kiyoh($connector, $count);
            $company = $kiyoh->getCompany();

            $values = [];
            $values['percentageRecommendation'] = $company->getPercentageRecommendation();
            $values['averageRating'] = $company->getAverageRating();
            $values['numberReviews'] = $company->getNumberReviews();
            $values['reviews'] = $company->getReviews();

            $this->setValuesInDatabase($values);
        } catch (Exception $e) {
            $this->errorMessage[] = $e->getMessage();
            $this->success = false;
        }
    }


    /**
     * Post the fetched values to the database in de kiyoh_custom table
     *
     * @param $values
     */
    protected function setValuesInDatabase($values): void
    {
        $setValues = [];
        if (isset($values['percentageRecommendation']) && is_int($values['percentageRecommendation']) && $values['percentageRecommendation'] > 0) {
            $setValues[] = '`kiyoh_average_percentage` = ' . $values['percentageRecommendation'];
        }

        if (isset($values['numberReviews']) && is_int($values['numberReviews']) && $values['numberReviews'] > 0) {
            $setValues[] = '`kiyoh_comments_total` = ' . $values['numberReviews'];
        }

        if (isset($values['averageRating']) && is_float($values['averageRating']) && $values['averageRating'] > 0) {
            $setValues[] = '`kiyoh_average` = ' . $values['averageRating'];
        }

        if (isset($values['reviews']) && is_array($values['reviews'])) {
            $formattedReviews = $this->reviewFormatter($values['reviews']);
            $setValues[] = "`kiyoh_latest_feed` = '" . $formattedReviews . "'";
        }

        try {
            $query = "UPDATE `" . _DB_PREFIX_ . "kiyoh_custom`  SET " . implode(',', $setValues) .
                ",`kiyoh_updated` = '" . date('Y-m-d H:i:s') . "' WHERE `id` = '1'";

            $db = Db::getInstance(_PS_USE_SQL_SLAVE_);
            $res = $db->execute($query);
            $this->success = $res;

        } catch (Exception $e) {
            $this->errorMessage[] = $e->getMessage();
            $this->success = false;
        }
    }

    /**
     * Format the review to a minified and usable json array
     *
     * @param $reviews
     * @return string
     */
    private function reviewFormatter($reviews): string
    {
        $reviewsList = '{}';
        try {
            $reviewListArray = [];
            foreach ($reviews as $rev) {
                $newReview = [];
                $newReview['customer_name'] = ucwords($rev->getAuthor());
                $newReview['customer_city'] = ucwords($rev->getCity());
                $newReview['score'] = (float)$rev->getRating();
                $newReview['recommend'] = (bool)$rev->getContentItem('DEFAULT_RECOMMEND')->getRating();
                $newReview['review_message_header'] = (string)$rev->getContentItem('DEFAULT_ONELINER')->getRating();
                $newReview['review_message'] = (string)$rev->getContentItem('DEFAULT_OPINION')->getRating();
                $newReview['date'] = (string)$rev->getDateSince()->format('d-m-Y H:i:s');

                $reviewListArray[] = $newReview;
            }

            $reviewsList = json_encode($reviewListArray, JSON_HEX_APOS);

        } catch (Exception $e) {
            $this->errorMessage[] = $e->getMessage();
            $this->success = false;
        }

        if ($this->testIfIsJson($reviewsList)) {
            return $reviewsList;
        }
        return '';
    }


    /**
     * Test if string is a json string
     *
     * @param $str
     * @return bool
     */
    private function testIfIsJson($str): bool
    {
        try {
            $json = json_decode($str);
            return $json && $str != $json;
        } catch (Exception $e) {
            $this->errorMessage[] = $e->getMessage();
            $this->errorMessage[] = 'Failed to make an usable review array';
            $this->success = false;
            return false;
        }
    }


    /**
     * return readable error messages
     *
     * @return string
     */
    public function showErrorMessages(): string
    {
        if ($this->debug) {
            return implode('</br>', $this->errorMessage);
        } else {
            return '';
        }
    }


    /**
     * return state of class, is it successfully or not
     *
     * @return string|bool
     */
    public function showValidate(): string|bool
    {
        if ($this->debug) {
            return $this->success ? 'yes!, running done' : 'no! failing';
        } else {
            return $this->success;
        }
    }
}


/**
 *
 *
 * Run the kiyoh data fetcher
 *
 *
 */
$class = new UpdateKiyohDataToDatabase(true, 50);

try {
    $class->fetchDataFromKiyohServer();
    echo $class->showErrorMessages();
    echo $class->showValidate();
} catch (Exception $e) {
    echo $e->getMessage() . '<br/>';
    echo $class->showErrorMessages();
}


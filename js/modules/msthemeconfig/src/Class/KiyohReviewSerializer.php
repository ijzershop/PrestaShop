<?php

declare(strict_types=1);

namespace MsThemeConfig\Class;

use DateTimeInterface;

/**
 * Serializes JKetelaar\Kiyoh\Model\Review and ReviewContent objects into arrays/JSON
 * to avoid empty JSON objects caused by private/protected properties.
 */
final class KiyohReviewSerializer
{
    /**
     * @param iterable<object> $reviews Iterable of JKetelaar\Kiyoh\Model\Review objects
     *
     * @return array<int, array<string, mixed>>
     */
    public static function serializeReviews(iterable $reviews): array
    {
        $result = [];
        foreach ($reviews as $review) {
            $result[] = self::serializeReview($review);
        }

        return $result;
    }

    /**
     * @param object $review JKetelaar\Kiyoh\Model\Review
     *
     * @return array<string, mixed>
     */
    public static function serializeReview(object $review): array
    {
        $content = [];
        if (method_exists($review, 'getContent')) {
            $contents = $review->getContent();
            if (is_iterable($contents)) {
                foreach ($contents as $item) {
                    switch ($item->getGroup()) {
                        case 'DEFAULT_OVERALL':
                            $content['score'] = self::fetchReviewContent($item);
                            break;
                        case 'DEFAULT_ONELINER':
                            $content['title'] = self::fetchReviewContent($item);
                            break;
                        case 'DEFAULT_OPINION':
                            $content['review'] = self::fetchReviewContent($item);
                            break;
                        case 'DEFAULT_RECOMMEND':
                            $content['recommend'] = self::fetchReviewContent($item);
                            break;
                    }
                }
            }
        }

        $dateSince = null;
        if (method_exists($review, 'getDateSince')) {
            $ds = $review->getDateSince();
            if ($ds instanceof DateTimeInterface) {
                $dateSince = $ds->format(DATE_ATOM);
            }
        }

        $updatedSince = null;
        if (method_exists($review, 'getUpdatedSince')) {
            $us = $review->getUpdatedSince();
            if ($us instanceof DateTimeInterface) {
                $updatedSince = $us->format(DATE_ATOM);
            }
        }

        return array_merge_recursive($content, [
            'id' => method_exists($review, 'getId') ? $review->getId() : null,
            'author' => method_exists($review, 'getAuthor') ? $review->getAuthor() : null,
            'city' => method_exists($review, 'getCity') ? $review->getCity() : null,
            'rating' => method_exists($review, 'getRating') ? (float) $review->getRating() : null,
            'comment' => method_exists($review, 'getComment') ? (string) $review->getComment() : null,
            'referenceCode' => method_exists($review, 'getReferenceCode') ? (string) $review->getReferenceCode() : null,
            'dateSince' => $dateSince,
            'updatedSince' => $updatedSince,
        ]);
    }

    /**
     * @param object $content JKetelaar\Kiyoh\Model\ReviewContent
     *
     * @return bool|float|int|string
     */
    public static function fetchReviewContent(object $content): bool|float|int|string
    {
        $type = method_exists($content, 'getType') ? $content->getType() : null;
        $ratingRaw = method_exists($content, 'getRating') ? $content->getRating() : null;

        $rating = $ratingRaw;
        if ($type === 'INT' || $type === 'NUMBER') {
            $rating = $ratingRaw !== null ? (int) $ratingRaw : null;
        } elseif ($type === 'BOOLEAN' || $type === 'BOOL') {
            if (is_string($ratingRaw)) {
                $lower = strtolower($ratingRaw);
                $rating = $lower === 'true' ? true : ($lower === 'false' ? false : null);
            } else {
                $rating = $ratingRaw !== null ? (bool) $ratingRaw : null;
            }
        } elseif ($type === 'FLOAT' || $type === 'DECIMAL') {
            $rating = $ratingRaw !== null ? (float) $ratingRaw : null;
        } else {
            $rating = $ratingRaw !== null ? (string) $ratingRaw : null;
        }

        return $rating;
    }

    /**
     * @param iterable<object> $reviews Iterable of JKetelaar\Kiyoh\Model\Review objects
     */
    public static function toJson(iterable $reviews, int $flags = 0): string
    {
        $payload = self::serializeReviews($reviews);

        try {
            return json_encode(
                $payload,
                $flags | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR
            );
        } catch (\JsonException $e) {
            return $e->getMessage();
        }
    }
}

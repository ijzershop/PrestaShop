<?php

/**
 *
 */
class Context extends ContextCore
{
    /** @var string|null */
    public $shop_favicon;

    /** @var string|null */
    public $shop_name;

    /** @var int|bool */
    public $is_counter_customer;

    /** @var int|bool */
    public $belongs_to_voucher_group;

    /** @var int|bool */
    public $belongs_to_counter_group;

    /** @var array|null */
    public $internal_product_categories;

}

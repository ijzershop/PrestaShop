<?php

namespace PHPSTORM_META {
    override(sql_injection_subst(), // this indicates that all SQL injections will have the following replacement rules
        map([
            "_DB_PREFIX_" => "ps176_", // all #_ in injected SQL string will be replaced with mydatabase
            ]));
}

<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull as ContractConvertEmptyStringsToNull;

class ConvertEmptyStringsToNull extends ContractConvertEmptyStringsToNull {
    protected function transform($key, $value) {
        return ($value === '' || $value === 'null') ? null : $value;
    }

}

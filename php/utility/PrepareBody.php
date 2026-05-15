<?php
declare(strict_types=1);

// FreeBirds SDK utility: prepare_body

class FreeBirdsPrepareBody
{
    public static function call(FreeBirdsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}

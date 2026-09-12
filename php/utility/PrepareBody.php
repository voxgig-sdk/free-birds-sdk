<?php
declare(strict_types=1);

// FreeBirds SDK utility: prepare_body

class FreeBirdsPrepareBody
{
    public static function call(FreeBirdsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            $body = ($ctx->utility->transform_request)($ctx);
            // PHP cannot tell an empty map from an empty list, and this
            // vendored struct answers [] where the canonical transform
            // answers NO VALUE for a reference that resolves to nothing -
            // collapse both to "no body" (the shared corpus pins the
            // missing-reference case to null).
            return (is_array($body) && 0 === count($body)) ? null : $body;
        }
        return null;
    }
}

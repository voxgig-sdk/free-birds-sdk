<?php
declare(strict_types=1);

// FreeBirds SDK utility: result_headers

class FreeBirdsResultHeaders
{
    public static function call(FreeBirdsContext $ctx): ?FreeBirdsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}

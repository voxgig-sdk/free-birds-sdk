<?php
declare(strict_types=1);

// FreeBirds SDK utility: result_body

class FreeBirdsResultBody
{
    public static function call(FreeBirdsContext $ctx): ?FreeBirdsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}

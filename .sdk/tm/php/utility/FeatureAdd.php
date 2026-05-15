<?php
declare(strict_types=1);

// FreeBirds SDK utility: feature_add

class FreeBirdsFeatureAdd
{
    public static function call(FreeBirdsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}

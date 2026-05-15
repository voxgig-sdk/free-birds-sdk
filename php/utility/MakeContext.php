<?php
declare(strict_types=1);

// FreeBirds SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FreeBirdsMakeContext
{
    public static function call(array $ctxmap, ?FreeBirdsContext $basectx): FreeBirdsContext
    {
        return new FreeBirdsContext($ctxmap, $basectx);
    }
}

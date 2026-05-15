<?php
declare(strict_types=1);

// FreeBirds SDK exists test

require_once __DIR__ . '/../freebirds_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FreeBirdsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}

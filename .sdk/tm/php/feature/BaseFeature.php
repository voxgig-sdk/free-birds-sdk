<?php
declare(strict_types=1);

// FreeBirds SDK base feature

class FreeBirdsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FreeBirdsContext $ctx, array $options): void {}
    public function PostConstruct(FreeBirdsContext $ctx): void {}
    public function PostConstructEntity(FreeBirdsContext $ctx): void {}
    public function SetData(FreeBirdsContext $ctx): void {}
    public function GetData(FreeBirdsContext $ctx): void {}
    public function GetMatch(FreeBirdsContext $ctx): void {}
    public function SetMatch(FreeBirdsContext $ctx): void {}
    public function PrePoint(FreeBirdsContext $ctx): void {}
    public function PreSpec(FreeBirdsContext $ctx): void {}
    public function PreRequest(FreeBirdsContext $ctx): void {}
    public function PreResponse(FreeBirdsContext $ctx): void {}
    public function PreResult(FreeBirdsContext $ctx): void {}
    public function PreDone(FreeBirdsContext $ctx): void {}
    public function PreUnexpected(FreeBirdsContext $ctx): void {}
}

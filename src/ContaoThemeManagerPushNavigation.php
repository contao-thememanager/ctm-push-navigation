<?php

declare(strict_types=1);

namespace ContaoThemeManager\PushNavigation;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class ContaoThemeManagerPushNavigation extends Bundle
{
    public function getPath(): string
    {
        return \dirname(__DIR__);
    }
}

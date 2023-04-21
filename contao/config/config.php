<?php

// Add SCSS sources
$GLOBALS['TC_SOURCES']['configFiles'][] = 'bundles/contaothememanagerpushnavigation/framework/scss/_config.scss';

// Push base css as first entry
array_unshift($GLOBALS['TC_SOURCES']['files'], 'bundles/contaothememanagerpushnavigation/framework/scss/_pushnavigation.scss');

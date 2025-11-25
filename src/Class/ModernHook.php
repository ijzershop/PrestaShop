        // Ensure Tab params and parents early to avoid BO navbar exceptions
        private function ensureMsTabRouteParams(): void
        {
            try {
                $log = new \FileLogger(0);
                $log->setFilename(_PS_ROOT_DIR_ . DIRECTORY_SEPARATOR . 'var' . DIRECTORY_SEPARATOR . 'logs' . DIRECTORY_SEPARATOR . 'MsThemeConfig.log');

                // Only verify/update existing tabs - creation is handled by installTabs() during module installation
                // Key = class_name, Value = expected parent class_name
                $allowedTabs = [
                    'AdminModerneSmidParent' => 'CONFIGURE',
                    'MsAdminThemeConf' => 'AdminModerneSmidParent',
                    'MsAdminAIDescriptions' => 'AdminModerneSmidParent',
                    'MsAdminCatalogBackup' => 'AdminModerneSmidParent',
                    'AdminOfferController' => 'AdminParentOrders',
                ];

                foreach ($allowedTabs as $className => $parentClass) {
                    $tabId = (int)\Tab::getIdFromClassName($className);
                    if ($tabId <= 0) {
                        // Tab doesn't exist - log warning but don't create (should be created during install)
                        $log->logWarning('[msthemeconfig] Tab ' . $className . ' not found. Module may need reinstallation.');
                        continue;
                    }

<?php
namespace MsThemeConfig\Class;

use Context;
use Exception;
use Smarty;

/**
 *
 */
class KoopmanTemplateRenderer
{
    private string $templatesDir;
    private array $variables = [];
    private Smarty $smarty;

    public function __construct(string $templatesDir = null)
    {
        // Get Smarty instance from PrestaShop context
        $this->smarty = Context::getContext()->smarty;

        if ($templatesDir === null) {
            // Update the default path to point to the koopman templates folder
            $this->templatesDir = _PS_MODULE_DIR_ . 'msthemeconfig'.DIRECTORY_SEPARATOR.'views'.DIRECTORY_SEPARATOR.'templates'.DIRECTORY_SEPARATOR.'koopman'.DIRECTORY_SEPARATOR;
        } else {
            $this->templatesDir = rtrim($templatesDir, '/') . '/';
        }
    }

    /**
     * @param string $key
     * @param $value
     * @return $this
     */
    public function assign(string $key, $value): self
    {
        $this->variables[$key] = $value;
        return $this;
    }

    public function assignMultiple(array $variables): self
    {
        foreach ($variables as $key => $value) {
            $this->assign($key, $value);
        }
        return $this;
    }

    /**
     * @throws Exception
     */
    public function render(string $template): string
    {
        $templatePath = $this->templatesDir . $template;

        if (!file_exists($templatePath)) {
            throw new Exception("Template file not found: {$templatePath}");
        }

        // Create a temporary Smarty template object
        $tempSmarty = clone $this->smarty;

        // Clear any previous assignments to avoid conflicts
        $tempSmarty->clearAllAssign();

        // Assign all variables to Smarty
        foreach ($this->variables as $key => $value) {
            $tempSmarty->assign($key, $value);
        }

        // Fetch the template content using Smarty
        return $tempSmarty->fetch($templatePath);
    }
}


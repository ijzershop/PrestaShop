<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\Console\Question;

use Symfony\Component\Console\Exception\InvalidArgumentException;

/**
 * Represents a choice question.
 *
 * @author Fabien Potencier <fabien@symfony.com>
 */
class ChoiceQuestion extends Question
{
    private $choices;
    private $multiselect = false;
    private $prompt = ' > ';
    private $errorMessage = 'Value "%s" is invalid';

    /**
     * @param string $question The question to ask to the user
     * @param array  $choices  The list of available choices
     * @param mixed  $default  The default answer to return
     */
    public function __construct(string $question, array $choices, $default = null)
    {
        if (!$choices) {
            throw new \LogicException('Choice question must have at least 1 choice available.');
        }

        parent::__construct($question, $default);

        $this->choices = $choices;
        $this->setValidator($this->getDefaultValidator());
        $this->setAutocompleterValues($choices);
    }

    /**
     * Returns available choices.
     *
     * @return array
     */
    public function getChoices()
    {
        return $this->choices;
    }

    /**
     * Sets multiselect option.
     *
     * When multiselect is set to true, multiple choices can be answered.
     *
     * @return $this
     */
    public function setMultiselect(bool $multiselect)
    {
        $this->multiselect = $multiselect;
        $this->setValidator($this->getDefaultValidator());

        return $this;
    }

    /**
     * Returns whether the choices are multiselect.
     *
     * @return bool
     */
    public function isMultiselect()
    {
        return $this->multiselect;
    }

    /**
     * Gets the prompt for choices.
     *
     * @return string
     */
    public function getPrompt()
    {
        return $this->prompt;
    }

    /**
     * Sets the prompt for choices.
     *
     * @return $this
     */
    public function setPrompt(string $prompt)
    {
        $this->prompt = $prompt;

        return $this;
    }

    /**
     * Sets the error message for invalid values.
     *
     * The error message has a string placeholder (%s) for the invalid value.
     *
     * @return $this
     */
    public function setErrorMessage(string $errorMessage)
    {
        $this->errorMessage = $errorMessage;
        $this->setValidator($this->getDefaultValidator());

        return $this;
    }

    private function getDefaultValidator(): callable
    {
        $choices = $this->choices;
        $errorMessage = $this->errorMessage;
        $multiselect = $this->multiselect;
        $isAssoc = $this->isAssoc($choices);

        return function ($selected) use ($choices, $errorMessage, $multiselect, $isAssoc) {
            if ($multiselect) {
                // Check for a separated comma values
                if (!preg_match('/^[^,]+(?:,[^,]+)*$/', $selected, $matches)) {
                    throw new InvalidArgumentException(sprintf($errorMessage, $selected));
                }

                $selectedChoices = explode(',', $selected);
            } else {
                $selectedChoices = [$selected];
            }

            if ($this->isTrimmable()) {
                foreach ($selectedChoices as $k => $v) {
                    $selectedChoices[$k] = trim($v);
                }
            }

            $multiselectChoices = [];
            foreach ($selectedChoices as $value) {
                $results = [];
                foreach ($choices as $key => $choice) {
                    if ($choice === $value) {
                        $results[] = $key;
                    }
                }

                if (\count($results) > 1) {
                    throw new InvalidArgumentException(sprintf('The provided answer is ambiguous. Value should be one of "%s".', implode('" or "', $results)));
                }

                $result = array_search($value, $choices);

                if (!$isAssoc) {
                    if (false !== $result) {
                        $result = $choices[$result];
                    } elseif (isset($choices[$value])) {
                        $result = $choices[$value];
                    }
                } elseif (false === $result && isset($choices[$value])) {
                    $result = $value;
                }

                if (false === $result) {
                    throw new InvalidArgumentException(sprintf($errorMessage, $value));
                }

                $multiselectChoices[] = (string) $result;
            }

            if ($multiselect) {
                return $multiselectChoices;
            }

            return current($multiselectChoices);
        };
    }
}

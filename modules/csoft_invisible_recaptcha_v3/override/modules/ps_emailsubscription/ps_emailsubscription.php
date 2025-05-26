<?php
if (!defined('_PS_VERSION_')) {
  exit;
}

class Ps_EmailsubscriptionOverride extends Ps_Emailsubscription
{
  public function newsletterRegistration($hookName = NULL)
  {
    $data = array(
      'secret' => Configuration::get('RECAPTCHA_PRIVATE_KEY'),
      'response' => $_POST['g-recaptcha-response']
    );
    $verify = curl_init();
    if (isset($verify) && $verify) {
      curl_setopt($verify, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
      curl_setopt($verify, CURLOPT_POST, true);
      curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($data));
      curl_setopt($verify, CURLOPT_SSL_VERIFYPEER, false);
      curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);
      $response = @curl_exec($verify);
      curl_close($verify);
      $decode = json_decode($response, true);
      $score = Configuration::get('RECAPTCHA_SCORE');
      $nscore = $score / 10;

      if ($decode['success'] === true && $decode['score'] >= $nscore) {
        parent::newsletterRegistration($hookName);
      } else {
        $this->error = $this->l('You have been detected as a robot, your form can\'t be send.');
      }
    } else {
      $this->error = $this->l('An error occured.');
    }
  }

}

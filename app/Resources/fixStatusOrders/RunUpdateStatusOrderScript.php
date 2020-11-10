 <?php
/**
 * Cronjob to fetch all latest kiyoh reviews and save them in the database
 * To keep an updated overview page this cron needs to be run between every 5 to 15 minutes.
 *
 */

 /**
  *
  */


 class RunUpdateStatusOrderScript
 {
     public function __construct()
     {
         $this->parameters = require dirname(__FILE__).'../../app/config/parameters.php';
         $this->order_states = require dirname(__FILE__).'/pr_order_state_lang.php';
         $this->orders = require dirname(__FILE__).'/pr_orders.php';
         $this->serverName = $this->parameters['parameters']['database_host'];
         $this->databaseName = $this->parameters['parameters']['database_name'];
         $this->databaseUserName = $this->parameters['parameters']['database_user'];
         $this->databaseUserPass = $this->parameters['parameters']['database_password'];
         $this->databaseTable = 'ps176_orders';
         $this->completedSuccessRecords = [];
         $this->errorRecords = [];
     }

     public function fetchNewState($oldState){
        $newState = 0;
        $states = $this->order_states;
        for ($i=0; $i < count($states); $i++) { 
            if((int)$oldState == (int)$states[$i]['id_order_state']){
                $newState = (int)$states[$i]['id_new_order_state'];
                break;
            }
        }
        return $newState;
     }

     public function updateValuesInDatabase()
     {
         $servername = $this->serverName;
         $dbname = $this->databaseName;
         $username = $this->databaseUserName;
         $password = $this->databaseUserPass;

         $orders = $this->orders;
         $states = $this->order_states;
         try {
             $conn = new PDO("mysql:host=$servername;dbname=".$dbname, $username, $password);
             // set the PDO error mode to exception
             $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


             for ($x=0; $x < count($orders); $x++) { 
                $reference = $orders[$x]['reference'];
                $newOrderState = $this->fetchNewState($orders[$x]['current_state']);
                $data = [
                     'reference' => $reference,
                     'new_state' => (int)$newOrderState
                 ];

                $sql = 'UPDATE `'.$this->databaseTable.'` SET current_state=:new_state WHERE reference=:reference';

                $stmt = $conn->prepare($sql);
                $stmt->execute($data);
            
                    $databaseErrors = $stmt->errorInfo();

                    if( !empty($databaseErrors) ){  
                        $errorInfo = json_encode($databaseErrors, true);
                        $this->errorRecords[] = 'Reference:'.$reference.',State:'.$newOrderState.',Error:'.$errorInfo;         
                    } else {
                        $this->completedSuccessRecords[] = 'Reference:'.$reference.',State:'.$newOrderState.',Success:'.$sql;
                    }
             }

             print_r('Errors: <br>');
             print_r('<br>');
             print_r($this->errorRecords);
             print_r('<br>');
             print_r('<br>');
             print_r('Success <br>');
             print_r('<br>');
             print_r($this->completedSuccessRecords);
            
         } catch (PDOException $e) {
             echo 'Connection failed: '.$e->getMessage();
         }
         $conn = null;
     }
 }

$cron = new RunUpdateStatusOrderScript;
$cron->updateValuesInDatabase();
 ?>

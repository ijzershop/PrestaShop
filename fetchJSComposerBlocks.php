<?php 
// include('config/config.inc.php');
// include('init.php');
// require_once 'classes/module/Module.php';

$host = '127.0.0.1';
$db   = 'ijzershop176';
$db2   = 'ijzershop-nl.local';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';
$prefix = 'ps176_';
$prefix2 = 'pr_';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$dsn2 = "mysql:host=$host;dbname=$db2;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
try {
     $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}


$stmt = $pdo->query('SELECT * FROM '.$prefix.'category_lang');
$pattern = '(\[steasycontent id_st_easy_content=".{1,6}" hook_name="Block" st_time=".{1,12}"])';
$stmtUpdate = $pdo->prepare('UPDATE '.$prefix.'category_lang SET description = ? WHERE id_category = ? AND id_lang = ?');

while ($row = $stmt->fetch())
{
	if(!empty($row['description'])){
    	

            // $description = $row['description'];
            // $instance = Module::getInstanceByName('jscomposer');
            // $instance->init();
            // $row['description'] = $instance->do_shortcode($description);


    	$res = preg_replace_callback($pattern, 'checkMatches' , $row['description'], PREG_OFFSET_CAPTURE);
    	$row['description'] = $res;
	} 
    try {
        $stmtUpdate->execute([$row['description'], $row['id_category'] , $row['id_lang']]);
    } catch (Exception $e) {
        var_export($e);
    
        echo 'failed'.$row['id_category'];
    }

echo 'done';    
    // var_export($dom);
    // var_export($row);

}


function checkMatches($matches)
{	

$host = '127.0.0.1';
$db2   = 'ijzershop-nl.local';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';
$prefix2 = 'pr_';
$dsn2 = "mysql:host=$host;dbname=$db2;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

		$filtered = preg_replace(array('(\[steasycontent id_st_easy_content=")','(" hook_name="Block" st_time=".{1,12}"])'), array('',''), $matches[0]);
        switch ($filtered) {
            case 639:
                    $htmlBlock = '';
                break;
            case 642:
                    $htmlBlock = '';
                break;
            case 641:
                    $htmlBlock = '';
                break;
            case 300:
                    $htmlBlock = '';
                break;
            default:
                $htmlBlock = '<div class="row">
            <div class="col-12 col-sm-6 col-md-6 col-lg-6"><img class="w-100 mx-auto" src="/uploads/sleutel-cat.png" alt="Categorie afbeelding">
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-6">
                <div class="h5 w-100 text-dark">Category Text</div>
                <p>Missende content voor st_easy_content id'.$filtered.' Category naam en tekst</p>
            </div>
        </div>';
                break;
        }
        
        return $htmlBlock;
}

 ?>
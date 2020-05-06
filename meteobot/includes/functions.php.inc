<?php

/**
 * Function back time of last record
 */
function time_of_last_record () {
  $query = db_select('meteobot', 'm');
  $query->addField('m', 'wid');
  $query->addField('m', 'created');
  $query->orderBy('wid', 'DESC');
  $query->range(0, 1);
  $result = $query->execute()->fetchAll();
  return $result[0]->created;
}

/**
 * Function that grab data from API URL.
 *
 * @param api_auth
 *   API autorization array, contain id, username, password, api_url.
 * @param start_time
 *   Time period start time.
 * @param end_time
 *   Time period end time.
 */
function getApiData($api_auth, $start_time, $end_time){

  // api authentification variables
  $id = $api_auth['sid'];
  $username = $api_auth['username'];
  $password = $api_auth['password'];
  $api_url = $api_auth['api_url'];

  // start and end times of the time period
  $start_time = date('Y-m-d H:i', strtotime($start_time));
  $end_time = date('Y-m-d H:i', strtotime($end_time));

  // query array
  $data = array(
    'id' => $id,
    'startTime' => $start_time,
    'endTime' => $end_time,
  );

  $options = array(
    'method' => 'GET',
    'data' => $data,
    'headers' => array('Content-Type' => 'application/json'),
  );

  $url = 'https://'.$username.':'.$password.'@'.$api_url;

  $full_url = url($url, array('query' => $data));

  $response = drupal_http_request($full_url, $options);

  // $response->data JSON string to array
  $lines = explode("\n", $response->data);
  $keys = explode(';', $lines[0]);

  $neki_niz = [];
  $pod_niz = [];

  for($i=1; $i<count($lines)-1; $i++){
    $vals = explode(';', $lines[$i]);
    for($k=0; $k<count($keys); $k++){
      $pod_niz[trim($keys[$k])] = trim($vals[$k]);
    }
    array_push($neki_niz, $pod_niz);
  }

  return $neki_niz;
}
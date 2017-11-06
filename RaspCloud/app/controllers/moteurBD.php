<?php

/**
     * Ouvre la connexion avec la base de donnée
     * @return con connexion mysqli
     */
    function connection() {
        $server = "localhost";
        $username = "root";
        $password = "";
        $dbname = "avizobd";

        $con = new mysqli($server, $username, $password, $dbname);

        //Output any connection error
        if ($con->connect_error) {
            die('Error : (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
        }
        return $con;
    }
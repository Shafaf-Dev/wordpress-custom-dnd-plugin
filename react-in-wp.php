<?php
/**
 * Plugin Name:       React in WP
 * Description:       WP plugin to depict usage of react in WordPress.
 * Version:           1.0.0
 * Author:            Shafaf
 * Text Domain:       react-in-wp
 * Domain Path:       /languages
 *
 */

if(!defined('WPINC')){	die; }

add_action( 'admin_menu', 'admin_menu' );
add_action('admin_enqueue_scripts', 'enqueue_custom_scripts');
add_action('wp_ajax_dnd_template', 'save_template_content');

function admin_menu(){
    add_menu_page( 'WP React', 'WP React', 'manage_options', 'wp-react', 'render_page', ' dashicons-clipboard', 10 );
}

function render_page(){
    ?>
    <div class="wrapper">
        <h2>React Contents</h2>
        <div id="react_contents"></div>
    </div>
    <?php
}

function enqueue_custom_scripts() {
    $settings = get_user_meta(get_current_user_id(),'thdnd_template_data');
    $settings = isset($settings) ? $settings : '';
    $dnd_var = array(
            'ajaxurl'           => admin_url( 'admin-ajax.php' ),
            'settings'          => $settings,
        );
    wp_enqueue_script( 'react-admin-script', plugin_dir_url( __FILE__ ) . 'build/index.js', array('wp-element'), '1.0.0', true );
    wp_enqueue_style ('styles', plugins_url('react-in-wp/src/styles.css', dirname(__FILE__)), array(), '1.0.0');
    wp_localize_script('react-admin-script', 'dnd_admin_var', $dnd_var);
}

function save_template_content(){
    if (isset($_POST['savedData'])) {
        $dnd_use_template =  $_POST['savedData'];
        update_user_meta(get_current_user_id(), 'thdnd_template_data', $dnd_use_template );
        wp_send_json($dnd_use_template);
    }
}
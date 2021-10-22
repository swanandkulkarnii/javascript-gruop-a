<?php 
namespace app\ModuleManager;

    interface ModuleInterface {
        public function view($id);
        public function create();
        public function update($id);
        public function delete($id);
        public function index();
  }

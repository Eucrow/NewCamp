from PyInstaller.utils.hooks import collect_submodules
hiddenimports = [
   'rest_framework.apps',
   'rest_framework.authentication',
   'rest_framework.negotiation',
   'rest_framework.permissions',
   'rest_framework.metadata'
   ]
   
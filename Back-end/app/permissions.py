from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        # Exibe no console o usuário e seu cargo (para fins de debug)
        print("Usuário: ", request.user)
        print("Cargo: ", request.user.cargo)

        # Verifica se o usuário está autenticado e tem cargo 'A' (Administrador)
        if request.user.is_authenticated and request.user.cargo == 'A':
            return True
        
        # Caso contrário, nega a permissão
        return False
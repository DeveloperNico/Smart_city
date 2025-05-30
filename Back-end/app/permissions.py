from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        print("Usuário: ", request.user)
        print("Cargo: ", request.user.cargo)
        if request.user.is_authenticated and request.user.cargo == 'A':
            return True
        return False
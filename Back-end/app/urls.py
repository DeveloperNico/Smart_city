from django.urls import path
from .views import *

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('me/', get_me, name='me'),
    path('register/', Register.as_view(), name='register'),
    path('users/<int:pk>/', UserRetriveUpdateDestroyView.as_view(), name='user-retrieve-update-destroy'),

    # Endpoints para importação de sensores via Excel -----------------------------------------------------------------------------
    path('ambients/import/', ImportAmbientsExcelView.as_view(), name='import-ambients-excel'),
    path('historic/import/', ImportHistoricExcelView.as_view(), name='import-historic-excel'),
    path('sensors/import/', ImportSensorsExcelView.as_view(), name='import-sensors-excel'),
    # -----------------------------------------------------------------------------------------------------------------------------
    
    # Importação de sensores de luminosidade, temperatura, umidade e contadores GET, POST, PUT, DELETE ----------------------------
    path('sensors/', SensorsListCreateView.as_view(), name='sensors-list-create'),
    path('sensors/<int:pk>/', SensorsRetriveUpdateDestroyView.as_view(), name='sensors-retrieve-update-destroy'),
    # -----------------------------------------------------------------------------------------------------------------------------

    # Importação de ambientes e histórico GET, POST, PUT, DELETE ------------------------------------------------------------------
    path('ambients/', AmbientsListCreateView.as_view(), name='ambients-list-create'),
    path('ambients/<int:pk>/', AmbientsRetriveUpdateDestroyView.as_view(), name='ambients-retrieve-update-destroy'),
    path('historic/', HistoricListCreateView.as_view(), name='historic-list-create'),
    path('historic/<int:pk>/', HistoricRetriveUpdateDestroyView.as_view(), name='historic-retrieve-update-destroy'),
    # -----------------------------------------------------------------------------------------------------------------------------

    # Endpoints para exportação dos dados para Excel ------------------------------------------------------------------------------
    path('export/sensors/', ExportSensorsExcelView.as_view()),
    path('export/ambients/', ExportAmbientsExcelView.as_view()),
    path('export/historic/', ExportHistoricExcelView.as_view()),
]
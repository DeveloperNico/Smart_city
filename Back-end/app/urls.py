from django.urls import path
from .views import *

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetriveUpdateDestroyView.as_view(), name='user-retrieve-update-destroy'),

    # Endpoints para importação de sensores via Excel -------------------------------------------------------------------------------
    path('sensors/counter/import/', importSensorsCounterExcelView.as_view(), name='import-sensors-counter-excel'),
    path('sensors/temperature/import/', importSensorsTemperatureExcelView.as_view(), name='import-sensors-temperature-excel'),
    path('sensors/humidity/import/', importSensorsHumidityExcelView.as_view(), name='import-sensors-humidity-excel'),
    path('sensors/luminosity/import/', importSensorsLuminosityExcelView.as_view(), name='import-sensors-luminosity-excel'),
    path('ambients/import/', importAmbientsExcelView.as_view(), name='import-ambients-excel'),
    path('historic/import/', importHistoricExcelView.as_view(), name='import-historic-excel'),
    # -------------------------------------------------------------------------------------------------------------------------------
    
    # Importação de sensores de luminosidade, temperatura, umidade e contadores GET, POST, PUT, DELETE ------------------------------------------------
    path('sensors/counter/', SensorCounterListCreateView.as_view(), name='sensor-counter-list-create'),
    path('sensors/counter/<int:pk>/', SensorCounterRetriveUpdateDestroyView.as_view(), name='sensor-counter-retrieve-update-destroy'),
    path('sensors/temperature/', SensorTemperatureListCreateView.as_view(), name='sensor-temperature-list-create'),
    path('sensors/temperature/<int:pk>/', SensorTemperatureRetriveUpdateDestroyView.as_view(), name='sensor-temperature-retrieve-update-destroy'),
    path('sensors/humidity/', SensorHumidityListCreateView.as_view(), name='sensor-humidity-list-create'),
    path('sensors/humidity/<int:pk>/', SensorHumidityRetriveUpdateDestroyView.as_view(), name='sensor-humidity-retrieve-update-destroy'),
    path('sensors/luminosity/', SensorLuminosityListCreateView.as_view(), name='sensor-luminosity-list-create'),
    path('sensors/luminosity/<int:pk>/', SensorLuminosityRetriveUpdateDestroyView.as_view(), name='sensor-luminosity-retrieve-update-destroy'),
    # --------------------------------------------------------------------------------------------------------------------------------------------------

    # Importação de ambientes e histórico GET, POST, PUT, DELETE ---------------------------------------------------------
    path('ambients/', AmbientsListCreateView.as_view(), name='ambients-list-create'),
    path('ambients/<int:pk>/', AmbientsRetriveUpdateDestroyView.as_view(), name='ambients-retrieve-update-destroy'),
    path('historic/', HistoricListCreateView.as_view(), name='historic-list-create'),
    path('historic/<int:pk>/', HistoricRetriveUpdateDestroyView.as_view(), name='historic-retrieve-update-destroy'),
    # ---------------------------------------------------------------------------------------------------------------------
]
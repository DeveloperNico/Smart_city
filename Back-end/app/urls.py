from django.urls import path
from .views import *

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetriveUpdateDestroyView.as_view(), name='user-retrieve-update-destroy'),
    # path('import-sensors-excel/', importSensorsExcelView.as_view(), name='import-sensors-excel'),
    # path('sensors/', SensorsListCreateView.as_view(), name='sensors-list-create'),
    # path('sensors/<int:pk>/', SensorsRetriveUpdateDestroyView.as_view(), name='sensors-retrieve-update-destroy'),
    path('ambients/', AmbientsListCreateView.as_view(), name='ambients-list-create'),
    path('ambients/<int:pk>/', AmbientsRetriveUpdateDestroyView.as_view(), name='ambients-retrieve-update-destroy'),
    path('historic/', HistoricListCreateView.as_view(), name='historic-list-create'),
    path('historic/<int:pk>/', HistoricRetriveUpdateDestroyView.as_view(), name='historic-retrieve-update-destroy'),
]
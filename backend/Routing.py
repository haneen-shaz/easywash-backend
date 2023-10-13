# routing.py

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import base.routing
from base.routing import websocket_urlpatterns

application = ProtocolTypeRouter(
    {
        "websocket": URLRouter(websocket_urlpatterns),
        "websocket": AuthMiddlewareStack(
            URLRouter(base.routing.websocket_urlpatterns)
        ),
    }
)

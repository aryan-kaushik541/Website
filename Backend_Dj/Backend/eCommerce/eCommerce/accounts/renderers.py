from rest_framework.renderers import JSONRenderer
import json

class UserRenderer(JSONRenderer):
    """
    Renderer which serializes to JSON.
    """
    charset='utf-8'
    def render(self,data,accepted_media_type=None, renderer_context=None):
        """
        Render `data` into JSON, returning a bytestring.
        """
        if 'ErrorDetail' in str(data):
            # This is used to convert python object into json string
            return json.dumps({'errors':data})
        return json.dumps(data)
        
        

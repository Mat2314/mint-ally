from rest_framework.response import Response

def handle_exceptions(info):
    """
        Capture all the exceptions and return error info response.
    """

    def inner_function(func):
        def wrapper(*args, **kwargs):
            try:
                return_value = func(*args, **kwargs)
                return return_value
            except Exception as e:
                print(f'Exception in function: {func.__name__}\n{e}')
                return Response({"error": "Could not process request", "message": info}, status=400)

        return wrapper

    return inner_function


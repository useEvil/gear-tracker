
def login_not_required(view_func):
    """
    Decorator which marks the given view as public (no login required).
    """
    view_func.login_not_required = True
    return view_func

class Response:
    def __init__(self, label=[], data=[], code=0):
        self.label = label
        self.data = data
        self.code = code

    def get_res(self):
        return {"label": self.label, "data": self.data, "code": self.code}

""" class ResponseSingle:
    def __init__(self, label='', data='', code=0):
        self.label = label
        self.data = data
        self.code = code

    def get_res(self):
        return {"label": self.label, "data": self.data, "code": self.code}
 """

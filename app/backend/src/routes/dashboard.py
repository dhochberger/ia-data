from flask import Blueprint, request
from src.utils.response_type import Response

dashboard_route = Blueprint('dashboard_route', __name__)

@dashboard_route.route('/dashboard', methods=['GET'])
def get_dashboard():
    frame = []
    return Response(label='dashboard list', data=frame, code=200).get_res()

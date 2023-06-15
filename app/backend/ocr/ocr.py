import base64
import json

import cv2
import numpy as np
from craft_text_detector import Craft


def getOcrInformation(image=None, base64_data=None):

    if image:
        im = cv2.imread(image)
    elif base64_data:
        encoded_data = base64_data.split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        im = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    height, width, c = im.shape

    output_dir = 'outputs/'

    # create a craft instance
    craft = Craft(output_dir=output_dir, crop_type="poly", cuda=False)

    # apply craft text detection and export detected regions to output directory
    prediction_result = craft.detect_text(im)

    biggest_area = 0
    index = 0
    boxes = prediction_result['boxes']
    counter_text_on_the_bottom = 0
    has_text_on_top = False
    for i, box in enumerate(boxes):
        x_size = box[2][0] - box[0][0]
        y_size = box[2][1] - box[0][1]
        area = x_size * y_size
        if area > biggest_area:
            biggest_area = area
            index = i
        y_position = box[0][1]
        if height - y_position < 100:
            counter_text_on_the_bottom += 1
        if y_position < 75:
            has_text_on_top = True

    is_title_movie_lowest_part = boxes[index][0][1] / height > 0.5
    is_containing_five_line_in_bottom = counter_text_on_the_bottom > 5

    # unload models from ram/gpu
    craft.unload_craftnet_model()
    craft.unload_refinenet_model()
    return is_title_movie_lowest_part, is_containing_five_line_in_bottom, has_text_on_top

def getPercentageFromCategories(cat):
    f = open('ocr/data.json')
    data = json.load(f)

    if cat not in data:
        return 'Wrong category'
    percentage_is_title_movie_lowest_part = data[cat]['is_title_movie_lowest_part'] / data[cat]['count']
    percentage_is_containing_five_line_in_bottom = data[cat]['is_containing_five_line_in_bottom'] / data[cat]['count']
    percentage_has_text_on_top = data[cat]['has_text_on_top'] / data[cat]['count']
    return percentage_is_title_movie_lowest_part, percentage_is_containing_five_line_in_bottom, percentage_has_text_on_top

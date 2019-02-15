/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {renderConfusionMatrix} from '../render/confusion_matrix';
import {getDrawArea} from '../render/render_utils';
import {renderTable} from '../render/table';
import {ConfusionMatrixData, Drawable} from '../types';

/**
 * Renders a per class accuracy table for classification task evaluation
 *
 * ```js
 * const labels = tf.tensor1d([0, 0, 1, 2, 2, 2]);
 * const predictions = tf.tensor1d([0, 0, 0, 2, 1, 1]);
 *
 * const result = await tfvis.metrics.perClassAccuracy(labels, predictions);
 * console.log(result)
 *
 * const container = {name: 'Per Class Accuracy', tab: 'Evaluation'};
 * const categories = ['cat', 'dog', 'mouse'];
 * await tfvis.show.perClassAccuracy(container, result, categories);
 * ```
 *
 * @param container A `{name: string, tab?: string}` object specifying which
 * surface to render to.
 * @param classAccuracy An `Array<{accuracy: number, count: number}>` array with
 * the accuracy data. See metrics.perClassAccuracy for details on how to
 * generate this object.
 * @param classLabels An array of string labels for the classes in
 * `classAccuracy`. Optional.
 *
 */
export async function showPerClassAccuracy(
    container: Drawable,
    classAccuracy: Array<{accuracy: number, count: number}>,
    classLabels?: string[]) {
  const drawArea = getDrawArea(container);

  const headers = [
    'Class',
    'Accuracy',
    '# Samples',
  ];
  const values: Array<Array<(string | number)>> = [];

  for (let i = 0; i < classAccuracy.length; i++) {
    const label = classLabels ? classLabels[i] : i.toString();
    const classAcc = classAccuracy[i];
    values.push([label, classAcc.accuracy, classAcc.count]);
  }

  return renderTable({headers, values}, drawArea);
}

/**
 * Renders a confusion matrix for classification task evaluation
 *
 * ```js
 * const labels = tf.tensor1d([0, 0, 1, 1, 2, 2, 2, 3 ,3 ,3, 4, 4]);
 * const predictions = tf.tensor1d([0, 0, 1, 0, 2, 3, 1, 3 ,4 ,3, 2, 2]);
 *
 * const matrix = await tfvis.metrics.confusionMatrix(labels, predictions);
 *
 * const container = {name: 'Confusion Matrix', tab: 'Evaluation'};
 * const categories = ['cat', 'dog', 'mouse', 'bird', 'fish'];
 * await tfvis.show.confusionMatrix(container, matrix, categories);
 * ```
 *
 * @param container A `{name: string, tab?: string}` object specifying which
 * surface to render to.
 * @param confusionMatrix A nested array of numbers with the confusion matrix
 * values. See metrics.confusionMatrix for details on how to generate this.
 * @param classLabels An array of string labels for the classes in
 * `confusionMatrix`. Optional.
 *
 */
/**
 * @doc {heading: 'Models & Tensors', subheading: 'Model Evaluation', namespace:
 * 'show'}
 */
export async function showConfusionMatrix(
    container: Drawable, confusionMatrix: number[][], classLabels?: string[]) {
  const drawArea = getDrawArea(container);

  const confusionMatrixData: ConfusionMatrixData = {
    values: confusionMatrix,
    labels: classLabels,
  };

  return renderConfusionMatrix(confusionMatrixData, drawArea, {
    height: 450,
  });
}

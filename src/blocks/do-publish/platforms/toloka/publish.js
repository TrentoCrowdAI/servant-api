const { createProject, createTaskPool, createTasks } = require('./toloka-api');
const templateDoDelegate = require(__base + 'delegates/template-do.delegate');
const renderDesign = require('./render');

/**
 * Publish the workflow on the Toloka platform as a new project.
 * @param {{}} blockData The data of the block of the workflow 
 * @param {[]} input The input items to publish
 */
const publish = async (blockData, input) => {
  let template_do = await templateDoDelegate.get(blockData.id_template_do);

  let design = renderDesign(template_do.data.blocks);
  let project = await createProject(template_do, design);

  project.taskPool = await createTaskPool(blockData, project);

  let tasks = await itemsToTasks(project.taskPool, input, design);
  
  project.tasks = await createTasks(tasks);

  return project;
};

/**
 * Convert the items to an array of Toloka tasks
 * @param {{}} pool
 * @param {String} items
 * @param {{}} design
 */
const itemsToTasks = async (pool, items, design) => {
  let tasks = [];

  for (let el of items) {
    let headers = Object.keys(el);

    let task = {
      pool_id: pool.id,
      input_values: {},
      overlap: 1
    };

    for (let key of headers) {
      if (Object.keys(design.input_spec).indexOf(key) != -1) {
        task.input_values[key] = el[key];
      } else if (key.endsWith('_gold')) {
        //gold item
        let pos = key.indexOf('_gold');

        let fieldName = key.substring(0, pos);
        if (Object.keys(design.output_spec).indexOf(fieldName) != -1) {
          if (task.known_solutions === undefined)
            task.known_solutions = [{ output_values: {}, correctness_weight: 1 }];

          task.known_solutions[0].output_values[fieldName] = el[key];
        }
      }
    }

    if (task.known_solutions !== undefined) {
      //fill with missing gold items in order to avoid errors
      for (let gold of Object.keys(design.output_spec)) {
        if (task.known_solutions[0].output_values[gold] === undefined)
          task.known_solutions[0].output_values[gold] = '';
      }
    }

    tasks.push(task);
  }

  return tasks;
};

module.exports = publish;
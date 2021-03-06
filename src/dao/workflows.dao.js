const db = require(__base + "db/index");


// create
const create = async (workflow) => {
    let res = await db.query(
        `insert into ${db.TABLES.Workflow}(created_at, id_project, data) values($1, $2, $3) returning *`,
        [new Date(), workflow.id_project, workflow.data]
    );

    return parseIntFields(res.rows[0]);
};

// get
const get = async (workId) => {
    let res = await db.query(
        `select * from ${db.TABLES.Workflow} 
            where id = $1 and deleted_at is NULL`,
        [workId]
    );

    return parseIntFields(res.rows[0]);
};
const getAll = async (projectId, userId) => {
    let cond = "";
    let params = [userId];
    if (projectId !== undefined) {
        cond = `and id_project = $2`;
        params.push(projectId);
    }

    let res = await db.query(
        `select * from ${db.TABLES.Workflow} 
            where deleted_at is NULL ${cond}
            and id_project in (
                select id from ${db.TABLES.Project} 
                where id_user = $1)`,
        params
    );

    return res.rows.map(x => parseIntFields(x));
};

//get public
const getPublic = async (workId) => {
    let res = await db.query(
        `select * from ${db.TABLES.Workflow} 
            where id = $1 and deleted_at is NULL
            and data->'shared' = 'true'`,
        [workId]
    );

    return parseIntFields(res.rows[0]);
};
const getAllPublic = async () => {
    let res = await db.query(
        `select * from ${db.TABLES.Workflow} 
            where deleted_at is NULL 
            and data->'shared' = 'true'`,
    );

    return res.rows.map(x => parseIntFields(x));
};

// delete
const deleteWorkflow = async (workId) => {
    let res = await db.query(
        `update ${db.TABLES.Workflow} 
            set deleted_at = $1
            where id = $2 returning *`,
        [new Date(), workId]
    );

    return parseIntFields(res.rows[0]);
};

// update
const update = async (workflow) => {
    let res = await db.query(
        `update ${db.TABLES.Workflow} 
            set updated_at = $1, data = $2
            where id = $3 returning *`,
        [new Date(), workflow.data, workflow.id]
    );

    return parseIntFields(res.rows[0]);
};

const parseIntFields = (item) => {
    if (item === undefined)
        return undefined;

    item.id = parseInt(item.id);
    item.id_project = parseInt(item.id_project);

    return item;
};

module.exports = {
    create,
    get,
    getAll,
    update,
    deleteWorkflow,
    getPublic,
    getAllPublic
};
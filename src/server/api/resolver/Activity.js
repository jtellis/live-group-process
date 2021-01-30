import entity from '../../entities/activities';

async function activities() {
    return await entity.getAll();
};

async function activity({ _id }) {
    return await entity.getOne(_id);
}

async function createActivity({ input }) {
    let commandResult = await entity.create(input);
    return commandResult.ops[0];
}

export default {
    activities,
    activity,
    createActivity
};

import entity from '../../entities/activities';

async function activities() {
    return await entity.getAll();
};

async function myActivities(_, req) {
    let { oidc: { user } } = req;
    return await entity.getByCreator(user);
}

async function activity({ _id }) {
    return await entity.getOne(_id);
}

async function createActivity({ input }, req) {
    let { oidc: { user } } = req;
    let commandResult = await entity.create(user, input);
    return commandResult.ops[0];
}

export default {
    activities,
    myActivities,
    activity,
    createActivity
};

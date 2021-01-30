import entity from '../../entities/activities';

async function activities() {
    return await entity.getAll();
};

async function activity({ _id }) {
    return await entity.getOne(_id);
}

export default {
    activities,
    activity
};

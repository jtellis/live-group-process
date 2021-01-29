import entity from '../../entities/activities';

async function activities() {
    return await entity.getAll();
};

async function activity({ id }) {
    return await entity.getOne(id);
}

export default {
    activities,
    activity
};

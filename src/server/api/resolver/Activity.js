import entity from '../../entities/activities';

async function activities() {
    return await entity.getAll();
};

export default {
    activities
};

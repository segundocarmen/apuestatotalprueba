'use client';

export const GetUserLocation = async () => {
    const location = await GetLocation();
    return location;
};

const GetLocation = async (): Promise<[number, number] | null> => {
    ValidateLocation();
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                resolve([coords.longitude, coords.latitude]);
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            err => {
                resolve(null);
                reject();
            }
        );
    });
};

const ValidateLocation = (): boolean => {
    if (!navigator.geolocation) {
        return false;
    }
    return true;
};

export const verifyAllowLocation = () => {
    navigator.permissions
        .query({
            name: 'geolocation'
        })
        .then(function (result) {
            if (result.state == 'granted') {
                return result.state;
            } else if (result.state == 'prompt') {
                return result.state;
            } else if (result.state == 'denied') {
                return result.state;
            }
            result.onchange = function () {
                return result.state;
            };
        });
};

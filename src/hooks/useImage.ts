import partlyCloudy from 'assets/images/partlyCloudy.svg';
import heavyRain from 'assets/images/09_light_rain_color.svg';
import sun from 'assets/images/01_sunny_color.svg';
import thunderstorm from 'assets/images/raining.svg';
import cloud from 'assets/images/cloud.svg';
import fog from 'assets/images/fog.svg';
import snow from 'assets/images/snow.svg';

export const useImage = () => {
	const renderWeatherImage = (weatherCondition) => {
		let imageSource: string;
		switch (weatherCondition) {
			case 'Thunderstorm':
				imageSource = thunderstorm as string;
				break;
			case 'Drizzle':
				imageSource = heavyRain as string;
				break;
			case 'Rain':
				imageSource = heavyRain as string;
				break;
			case 'Snow':
				imageSource = snow as string;
				break;
			case 'Clear':
				imageSource = sun as string;
				break;
			case 'Clouds':
				imageSource = cloud as string;
				break;
			case 'Mist':
				imageSource = fog as string;
				break;
			default:
				imageSource = partlyCloudy as string;
				break;
		}

		return imageSource;
	};



	return [renderWeatherImage];
};

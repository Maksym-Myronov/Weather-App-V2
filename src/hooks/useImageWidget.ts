import thunderstormTwo from 'assets/images/ThunderstormImage.svg';
import heavyRainTwo from 'assets/images/rainyWeather.svg';
import snowTwo from 'assets/images/1.svg';
import sunnyWeather from 'assets/images/sunnyImage№2.svg';
import cloudyWeather from 'assets/images/cloudy.svg';
import foggy from 'assets/images/Foggy.svg';

export const useImageWidget = () => {
	const renderWeatherImageForWidgets = (weather) => {
		let imageSourceForTag: string;
		switch (weather) {
			case 'Thunderstorm':
				imageSourceForTag = thunderstormTwo as string;
				break;
			case 'Drizzle':
				imageSourceForTag = heavyRainTwo as string;
				break;
			case 'Rain':
				imageSourceForTag = heavyRainTwo as string;
				break;
			case 'Snow':
				imageSourceForTag = snowTwo as string;
				break;
			case 'Clear':
				imageSourceForTag = sunnyWeather as string;
				break;
			case 'Clouds':
				imageSourceForTag = cloudyWeather as string;
				break;
			case 'Mist':
				imageSourceForTag = foggy as string;
				break;
			default:
				imageSourceForTag = cloudyWeather as string;
				break;
		}

		return imageSourceForTag;
	};

	return [renderWeatherImageForWidgets];
};

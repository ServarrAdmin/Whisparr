using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using NzbDrone.Core.Configuration;
using NzbDrone.Core.DecisionEngine.Specifications;
using NzbDrone.Core.Languages;
using NzbDrone.Core.Movies;
using NzbDrone.Core.Movies.Translations;
using NzbDrone.SignalR;
using Whisparr.Api.V3.Movies;
using Whisparr.Http;
using Whisparr.Http.REST;

namespace Whisparr.Api.V3.Calendar
{
    [V3ApiController]
    public class CalendarController : RestControllerWithSignalR<MovieResource, Movie>
    {
        private readonly IMovieService _moviesService;
        private readonly IMovieTranslationService _movieTranslationService;
        private readonly IUpgradableSpecification _qualityUpgradableSpecification;
        private readonly IConfigService _configService;

        public CalendarController(IBroadcastSignalRMessage signalR,
                            IMovieService moviesService,
                            IMovieTranslationService movieTranslationService,
                            IUpgradableSpecification qualityUpgradableSpecification,
                            IConfigService configService)
            : base(signalR)
        {
            _moviesService = moviesService;
            _movieTranslationService = movieTranslationService;
            _qualityUpgradableSpecification = qualityUpgradableSpecification;
            _configService = configService;
        }

        protected override MovieResource GetResourceById(int id)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public List<MovieResource> GetCalendar(DateTime? start, DateTime? end, bool unmonitored = false, bool includeArtist = false)
        {
            var startUse = start ?? DateTime.Today;
            var endUse = end ?? DateTime.Today.AddDays(2);

            var resources = _moviesService.GetMoviesBetweenDates(startUse, endUse, unmonitored).Select(MapToResource);

            return resources.OrderBy(e => e.InCinemas).ToList();
        }

        protected MovieResource MapToResource(Movie movie)
        {
            if (movie == null)
            {
                return null;
            }

            var availDelay = _configService.AvailabilityDelay;
            var translations = _movieTranslationService.GetAllTranslationsForMovie(movie.Id);
            var translation = GetMovieTranslation(translations, movie);
            var resource = movie.ToResource(availDelay, translation, _qualityUpgradableSpecification);

            return resource;
        }

        private MovieTranslation GetMovieTranslation(List<MovieTranslation> translations, Movie movie)
        {
            if ((Language)_configService.MovieInfoLanguage == Language.Original)
            {
                return new MovieTranslation
                {
                    Title = movie.OriginalTitle,
                    Overview = movie.Overview
                };
            }

            return translations.FirstOrDefault(t => t.Language == (Language)_configService.MovieInfoLanguage && t.MovieId == movie.Id);
        }
    }
}

using System.Linq;
using Core.Entities;
using Core.Specification;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class SpecificationEvaluator<TEntity> where TEntity: BaseEntity 
    {
        public static IQueryable<TEntity> GetQUery(IQueryable<TEntity> inputQuery, 
        ISpecification<TEntity> spec)
        {
            var query = inputQuery;
            if(spec.Criteria != null)
            {
                query = query.Where(spec.Criteria);
            }
            query = spec.Includes.Aggregate(query, (current, include) => current.Include(include));
            return query;
        }
    }
}
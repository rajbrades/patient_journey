-- Seed data: 10X Health goals and tests
-- Run AFTER both migrations (001_initial_schema.sql + 002_add_collection_method.sql)

-- Clear existing data (safe for re-seeding)
delete from goal_test_mappings;
delete from tests;
delete from goals;

-- Goals
insert into goals (name, slug, description, icon, category, sort_order) values
  ('Increase Energy', 'increase-energy', 'Feeling fatigued or sluggish? Identify the root causes of low energy through targeted lab testing.', '⚡', 'vitality', 1),
  ('Evaluate My Hormones', 'evaluate-hormones', 'Get a comprehensive look at your hormonal health — from thyroid to sex hormones to adrenal function.', '🧬', 'hormones', 2),
  ('Improve Gut Health', 'improve-gut-health', 'Digestive issues, bloating, or food sensitivities? Uncover what''s happening in your gut.', '🫁', 'digestive', 3),
  ('Optimize Athletic Performance', 'optimize-performance', 'Train smarter by understanding your body''s recovery, inflammation, and nutrient status.', '🏋️', 'performance', 4),
  ('Support Weight Management', 'support-weight-management', 'Struggling with weight? Lab testing can reveal metabolic, hormonal, and nutritional factors.', '⚖️', 'metabolism', 5),
  ('Boost Immune Health', 'boost-immune-health', 'Strengthen your immune system by identifying deficiencies and inflammatory markers.', '🛡️', 'immune', 6),
  ('Improve Sleep Quality', 'improve-sleep', 'Poor sleep affects everything. Test the hormones and nutrients that regulate your sleep cycle.', '😴', 'vitality', 7),
  ('Assess Heart Health', 'assess-heart-health', 'Go beyond basic cholesterol. Get a detailed cardiovascular risk assessment.', '❤️', 'cardiovascular', 8),
  ('Enhance Mental Clarity', 'enhance-mental-clarity', 'Brain fog, poor focus, or mood swings? Identify the biochemical drivers.', '🧠', 'cognitive', 9),
  ('Anti-Aging & Longevity', 'anti-aging-longevity', 'Optimize the biomarkers associated with healthy aging and cellular vitality.', '🕰️', 'longevity', 10);

-- Tests: 10X Health real product catalog
-- Prices are placeholder — update when real pricing is available

-- Test 1: 74-Biomarker Comprehensive Wellness Panel (in-person phlebotomy)
insert into tests (name, slug, description, category, biomarkers, price_cents, collection_method, test_group) values
  ('74-Biomarker Comprehensive Wellness Panel', 'comprehensive-wellness-panel', 'Our most complete panel — 74 biomarkers covering blood counts, metabolic function, thyroid, hormones, vitamins, lipids, and inflammation. Traditional full phlebotomy draw performed in person.', 'comprehensive', array['WBC', 'RBC', 'Hemoglobin', 'Hematocrit', 'Platelets', 'MCV', 'MCH', 'MCHC', 'Glucose', 'BUN', 'Creatinine', 'Sodium', 'Potassium', 'Calcium', 'ALT', 'AST', 'Albumin', 'TSH', 'Free T3', 'Free T4', 'Total Testosterone', 'Free Testosterone', 'Estradiol', 'DHEA-S', 'SHBG', 'Cortisol', 'Fasting Insulin', 'HbA1c', 'Vitamin D', 'Vitamin B12', 'Folate', 'Iron', 'Ferritin', 'TIBC', 'Magnesium', 'hs-CRP', 'Homocysteine', 'Total Cholesterol', 'LDL', 'HDL', 'Triglycerides', 'ApoB', 'Lp(a)', 'IGF-1', 'LH', 'FSH', 'Prolactin', 'Progesterone', 'ESR', 'Uric Acid', 'GGT', 'Total Protein', 'Globulin', 'A/G Ratio', 'Total Bilirubin', 'Alkaline Phosphatase', 'CO2', 'Chloride', 'Phosphorus', 'RDW', 'MPV', 'Neutrophils', 'Lymphocytes', 'Monocytes', 'Eosinophils', 'Basophils', 'eGFR', 'BUN/Creatinine Ratio', 'LDL Particle Number', 'Omega-3 Index', 'EPA', 'DHA', 'AA:EPA Ratio', 'Transferrin Saturation', 'VLDL'], 59900, 'in-person', null);

-- Test 2: AHB Blood Collection Device panels (4 separate panels, grouped)
insert into tests (name, slug, description, category, biomarkers, price_cents, collection_method, test_group) values
  ('AHB Hormone Panel', 'ahb-hormone-panel', 'At-home hormone assessment using the AHB blood collection device. Covers key male and female hormones with 12 biomarkers. No phlebotomy needed.', 'hormones', array['Total Testosterone', 'Free Testosterone', 'Estradiol', 'Progesterone', 'DHEA-S', 'SHBG', 'LH', 'FSH', 'Prolactin', 'Cortisol', 'IGF-1', 'Sex Hormone Panel'], 14900, 'at-home-blood', 'ahb'),
  ('AHB Cardiometabolic Panel', 'ahb-cardiometabolic', 'At-home cardiometabolic screening using the AHB blood collection device. Evaluates cholesterol, blood sugar, and metabolic risk markers.', 'cardiovascular', array['Total Cholesterol', 'LDL', 'HDL', 'Triglycerides', 'ApoB', 'HbA1c', 'Fasting Insulin', 'Glucose', 'hs-CRP', 'Lp(a)'], 12900, 'at-home-blood', 'ahb'),
  ('AHB Thyroid Panel', 'ahb-thyroid', 'At-home thyroid assessment using the AHB blood collection device. Complete thyroid function evaluation.', 'hormones', array['TSH', 'Free T3', 'Free T4', 'TPO Antibodies', 'Thyroglobulin Antibodies'], 9900, 'at-home-blood', 'ahb'),
  ('AHB Peptide Panel', 'ahb-peptide', 'At-home peptide marker assessment using the AHB blood collection device. Evaluates key peptide and growth factor levels.', 'hormones', array['IGF-1', 'Growth Hormone', 'BPC-157 Markers', 'Thymosin Beta-4 Markers', 'C-Peptide'], 11900, 'at-home-blood', 'ahb');

-- Test 3: KBMO FIT 176 Food Sensitivity + Gut Barrier
insert into tests (name, slug, description, category, biomarkers, price_cents, collection_method, test_group) values
  ('FIT 176 Food Sensitivity & Gut Health Test', 'fit-176-gut-health', 'At-home blood spot test measuring IgG reactivity to 176 foods plus gut barrier function markers. Identifies food sensitivities and intestinal permeability. Powered by KBMO FIT technology.', 'gut', array['176 Food IgG Antibodies', 'Zonulin', 'Candida', 'Gut Barrier Function'], 34900, 'at-home-blood-spot', null);

-- Test 4: Methylation Genetic Test
insert into tests (name, slug, description, category, biomarkers, price_cents, collection_method, test_group) values
  ('Methylation Genetic Test', 'methylation-genetics', 'At-home saliva collection (cheek swab) analyzing 5 key genes involved in methylation — a critical process for detox, energy production, and neurotransmitter function.', 'genetics', array['MTHFR C677T', 'MTHFR A1298C', 'MTR', 'MTRR', 'COMT'], 59900, 'at-home-saliva', null);

-- Test 5: Precision Genetics Test
insert into tests (name, slug, description, category, biomarkers, price_cents, collection_method, test_group) values
  ('Precision Genetics Test', 'precision-genetics', 'At-home saliva collection evaluating 54 genes to determine which foods optimize your health and which support weight loss — personalized nutrition based on your DNA.', 'genetics', array['54 Nutrition-Related Genes', 'Carbohydrate Metabolism Genes', 'Fat Metabolism Genes', 'Protein Metabolism Genes', 'Micronutrient Genes', 'Food Sensitivity Genes', 'Weight Management Genes'], 129900, 'at-home-saliva', null);

-- Test 6: MitoScreen Mitochondrial Health Test
insert into tests (name, slug, description, category, biomarkers, price_cents, collection_method, test_group) values
  ('MitoScreen Mitochondrial Health Test', 'mitoscreen', 'At-home blood test evaluating mitochondrial function — the powerhouse of your cells. Assesses energy production capacity, oxidative stress, and cellular vitality.', 'mitochondrial', array['CoQ10', 'NAD+', 'Mitochondrial DNA Copy Number', 'Oxidative Stress Markers', 'Lactate', 'Pyruvate', 'L-Carnitine'], 69900, 'at-home-blood', null);

-- Honest limitations per test (not_for_you)
update tests set not_for_you = 'You want a focused, single-topic panel rather than a broad screen — or you prefer at-home collection over an in-person blood draw.' where slug = 'comprehensive-wellness-panel';
update tests set not_for_you = 'You need a comprehensive evaluation beyond 12 hormone-focused biomarkers — the 74-biomarker in-person panel may be a better fit.' where slug = 'ahb-hormone-panel';
update tests set not_for_you = 'You want a full metabolic and hormonal picture — this panel focuses specifically on cardiovascular and blood sugar markers.' where slug = 'ahb-cardiometabolic';
update tests set not_for_you = 'You already have a confirmed thyroid diagnosis and are working with an endocrinologist — this is best for initial screening or monitoring.' where slug = 'ahb-thyroid';
update tests set not_for_you = 'You are looking for standard hormone or metabolic testing — this specialized panel is most relevant if you are using or considering peptide protocols.' where slug = 'ahb-peptide';
update tests set not_for_you = 'You need answers about how you feel right now — food sensitivity testing reveals long-term patterns, not acute allergic reactions.' where slug = 'fit-176-gut-health';
update tests set not_for_you = 'You want actionable blood-level data you can retest over time — genetic results are one-time insights into predisposition, not current status.' where slug = 'methylation-genetics';
update tests set not_for_you = 'You are looking for current blood biomarker levels — this DNA-based test shows genetic tendencies for nutrition, not real-time deficiencies.' where slug = 'precision-genetics';
update tests set not_for_you = 'You are primarily concerned with hormones or gut health — mitochondrial testing is most relevant for persistent fatigue, aging, or performance plateaus.' where slug = 'mitoscreen';

-- Goal-Test Mappings

-- Increase Energy
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('increase-energy', 'comprehensive-wellness-panel', 'primary', 'The 74-biomarker panel covers thyroid, iron, B12, and metabolic markers — the top causes of fatigue', 1),
  ('increase-energy', 'mitoscreen', 'primary', 'Mitochondrial dysfunction is a root cause of low cellular energy production', 2),
  ('increase-energy', 'ahb-thyroid', 'primary', 'Thyroid dysfunction is the #1 overlooked cause of fatigue — convenient at-home option', 3),
  ('increase-energy', 'ahb-hormone-panel', 'secondary', 'Hormonal imbalances (low testosterone, high cortisol) contribute to chronic fatigue', 4),
  ('increase-energy', 'methylation-genetics', 'secondary', 'Methylation gene variants (MTHFR) can impair energy metabolism and B-vitamin utilization', 5)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Evaluate My Hormones
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('evaluate-hormones', 'comprehensive-wellness-panel', 'primary', 'Full hormone panel including testosterone, estradiol, DHEA-S, thyroid, cortisol, and more', 1),
  ('evaluate-hormones', 'ahb-hormone-panel', 'primary', 'Convenient at-home hormone assessment covering 12 key biomarkers', 2),
  ('evaluate-hormones', 'ahb-thyroid', 'primary', 'Thyroid is central to hormonal balance — complete thyroid panel from home', 3),
  ('evaluate-hormones', 'ahb-peptide', 'secondary', 'Peptide and growth factor levels influence hormone signaling and recovery', 4),
  ('evaluate-hormones', 'methylation-genetics', 'secondary', 'COMT gene affects estrogen metabolism and neurotransmitter breakdown', 5)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Improve Gut Health
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('improve-gut-health', 'fit-176-gut-health', 'primary', 'Gold standard for identifying food sensitivities and gut barrier dysfunction', 1),
  ('improve-gut-health', 'comprehensive-wellness-panel', 'primary', 'Reveals inflammation markers, nutrient deficiencies, and liver function tied to gut health', 2),
  ('improve-gut-health', 'precision-genetics', 'secondary', 'Genetic insights into food sensitivities and nutrient metabolism guide dietary changes', 3),
  ('improve-gut-health', 'methylation-genetics', 'secondary', 'Methylation affects detoxification pathways that support gut healing', 4)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Optimize Athletic Performance
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('optimize-performance', 'comprehensive-wellness-panel', 'primary', 'Complete view of hormones, inflammation, iron, and recovery markers for athletes', 1),
  ('optimize-performance', 'ahb-hormone-panel', 'primary', 'Track testosterone, cortisol, and growth factors that drive recovery and growth', 2),
  ('optimize-performance', 'mitoscreen', 'primary', 'Mitochondrial health directly impacts endurance, power output, and recovery', 3),
  ('optimize-performance', 'ahb-cardiometabolic', 'secondary', 'Metabolic efficiency and cardiovascular markers affect athletic capacity', 4),
  ('optimize-performance', 'precision-genetics', 'secondary', 'DNA-based nutrition guidance optimizes fueling strategy for performance', 5),
  ('optimize-performance', 'ahb-peptide', 'secondary', 'Peptide markers inform recovery protocols and tissue repair capacity', 6)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Support Weight Management
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('support-weight-management', 'comprehensive-wellness-panel', 'primary', 'Covers thyroid, insulin, HbA1c, hormones — the key metabolic drivers of weight', 1),
  ('support-weight-management', 'precision-genetics', 'primary', 'Identifies which foods support weight loss based on your specific DNA profile', 2),
  ('support-weight-management', 'ahb-cardiometabolic', 'primary', 'Tracks insulin resistance, blood sugar, and metabolic risk from home', 3),
  ('support-weight-management', 'ahb-thyroid', 'secondary', 'Thyroid controls metabolic rate — an underdiagnosed cause of weight gain', 4),
  ('support-weight-management', 'ahb-hormone-panel', 'secondary', 'Hormonal imbalances (low T, high cortisol) promote fat storage', 5),
  ('support-weight-management', 'fit-176-gut-health', 'secondary', 'Food sensitivities and gut inflammation can stall weight loss', 6)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Boost Immune Health
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('boost-immune-health', 'comprehensive-wellness-panel', 'primary', 'WBC counts, vitamin D, iron, and inflammation markers assess immune readiness', 1),
  ('boost-immune-health', 'fit-176-gut-health', 'primary', '70% of immune function lives in the gut — identify sensitivities and barrier issues', 2),
  ('boost-immune-health', 'mitoscreen', 'secondary', 'Mitochondrial health supports immune cell energy and function', 3),
  ('boost-immune-health', 'methylation-genetics', 'secondary', 'Methylation supports immune signaling and detoxification pathways', 4)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Improve Sleep Quality
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('improve-sleep', 'comprehensive-wellness-panel', 'primary', 'Cortisol, magnesium, thyroid, and iron — the key sleep-disrupting biomarkers', 1),
  ('improve-sleep', 'ahb-hormone-panel', 'primary', 'Cortisol rhythm and hormone balance directly regulate sleep cycles', 2),
  ('improve-sleep', 'ahb-thyroid', 'secondary', 'Hyperthyroidism causes insomnia; hypothyroidism causes excessive sleepiness', 3),
  ('improve-sleep', 'methylation-genetics', 'secondary', 'COMT gene variants affect neurotransmitter breakdown impacting sleep quality', 4),
  ('improve-sleep', 'mitoscreen', 'secondary', 'Cellular energy dysfunction can cause fatigue without restorative sleep', 5)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Assess Heart Health
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('assess-heart-health', 'comprehensive-wellness-panel', 'primary', 'Advanced lipids, hs-CRP, HbA1c, homocysteine — complete cardiovascular risk picture', 1),
  ('assess-heart-health', 'ahb-cardiometabolic', 'primary', 'Convenient at-home cardiometabolic panel with ApoB, Lp(a), and metabolic markers', 2),
  ('assess-heart-health', 'precision-genetics', 'secondary', 'Genetic variants affecting cholesterol metabolism and cardiovascular risk', 3),
  ('assess-heart-health', 'methylation-genetics', 'secondary', 'MTHFR variants affect homocysteine levels — a key cardiovascular risk factor', 4)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Enhance Mental Clarity
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('enhance-mental-clarity', 'comprehensive-wellness-panel', 'primary', 'Thyroid, B12, iron, vitamin D, and inflammation — the top biochemical drivers of brain fog', 1),
  ('enhance-mental-clarity', 'methylation-genetics', 'primary', 'MTHFR and COMT gene variants directly affect neurotransmitter production and cognitive function', 2),
  ('enhance-mental-clarity', 'mitoscreen', 'primary', 'Brain cells are the most mitochondria-dense — cellular energy drives mental clarity', 3),
  ('enhance-mental-clarity', 'ahb-thyroid', 'secondary', 'Brain fog is a hallmark symptom of thyroid dysfunction', 4),
  ('enhance-mental-clarity', 'ahb-hormone-panel', 'secondary', 'Cortisol and hormone imbalances impair memory and focus', 5)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

-- Anti-Aging & Longevity
insert into goal_test_mappings (goal_id, test_id, relevance, rationale, sort_order)
select g.id, t.id, m.relevance, m.rationale, m.sort_order
from (values
  ('anti-aging-longevity', 'comprehensive-wellness-panel', 'primary', 'Broad baseline of all key longevity biomarkers — inflammation, metabolic, hormonal', 1),
  ('anti-aging-longevity', 'mitoscreen', 'primary', 'Mitochondrial decline is a hallmark of aging — assess and optimize cellular vitality', 2),
  ('anti-aging-longevity', 'methylation-genetics', 'primary', 'Methylation efficiency declines with age and affects DNA repair and detox', 3),
  ('anti-aging-longevity', 'ahb-peptide', 'primary', 'Growth factors and peptide markers are key indicators of biological age', 4),
  ('anti-aging-longevity', 'ahb-hormone-panel', 'secondary', 'Hormone optimization is a cornerstone of longevity protocols', 5),
  ('anti-aging-longevity', 'precision-genetics', 'secondary', 'DNA-guided nutrition supports long-term health optimization', 6),
  ('anti-aging-longevity', 'ahb-cardiometabolic', 'secondary', 'Metabolic health is a top predictor of healthspan and lifespan', 7)
) as m(goal_slug, test_slug, relevance, rationale, sort_order)
join goals g on g.slug = m.goal_slug
join tests t on t.slug = m.test_slug;

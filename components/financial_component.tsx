import { FinancialsProps } from '@/models/financials';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  data: FinancialsProps;
};

const FinancialsTable: React.FC<Props> = ({ data }) => {
  const formatCurrency = (value: number) => {
    return `${value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const Row = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financial Overview</Text>
      {data.default_monthly_rent &&
        <Text style={styles.estimation_rent}>ESTIMATION LOYERS MENSUEL</Text>
      }
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information ACHAT</Text>
        <Row label="Prix" value={formatCurrency(data.price)} />
        <Row label="Frais de Notaire" value={formatCurrency(data.notary_fees)} />
        <Row label="Prix Total" value={formatCurrency(data.total_price)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Row label="Mensualité Credit" value={formatCurrency(data.mensualite)} />
        <Row label="Loyers mensuels" value={formatCurrency(data.total_monthly_rent)} />
        <Row label="Loyers Annuels" value={formatCurrency(data.total_yearly_rent)} />
        <Row label="Charges Annuels" value={formatCurrency(data.annual_charge)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profitability</Text>
        <Row label="Monthly Cash Flow" value={formatCurrency(data.monthly_cash_flow)} />
        <Row label="Annual Cash Flow" value={formatCurrency(data.annual_cash_flow)} />
        <Row label="Raw Rentability" value={formatPercentage(data.raw_rentability)} />
        <Row label="Net Rentability" value={formatPercentage(data.net_rentability)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
        marginLeft: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  section: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  estimation_rent: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#f00',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 17,
    fontWeight: '500',
    color: '#333',
    textAlign: 'right',
  },
});

export default FinancialsTable;